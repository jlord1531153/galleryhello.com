#!/bin/bash
# Boots the production server, runs a set of HTTP checks against it, and
# shuts it down again. Used to verify the site without leaving a server
# process running.
set -u

cd "$(dirname "$0")/.."

PORT=3000
BASE="http://127.0.0.1:${PORT}"

# Read the collection slugs straight from the data file so the checks
# follow the catalogue instead of a hardcoded list.
SLUGS=$(python3 -c "
import json
print(' '.join(c['slug'] for c in json.load(open('data/collections.json'))))
")
CATEGORIES=$(python3 -c "
import json
print(' '.join(c['slug'] for c in json.load(open('data/category.json'))))
")

pnpm start > /tmp/gallery-verify.log 2>&1 &
SERVER_PID=$!

# Wait for the server to accept requests.
for _ in $(seq 1 40); do
  if curl -s -o /dev/null "${BASE}/" 2>/dev/null; then
    break
  fi
  sleep 0.5
done

echo "=== STATUS CODES ==="
check() {
  local path="$1"
  local expected="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}${path}")
  local mark="OK "
  if [ "$code" != "$expected" ]; then
    mark="FAIL"
  fi
  printf "%-4s %-42s expected=%s got=%s\n" "$mark" "$path" "$expected" "$code"
}

check "/" 200
check "/explore" 200
for category in $CATEGORIES; do
  check "/explore?category=${category}" 200
done
check "/explore?category=does-not-exist" 200
for slug in $SLUGS; do
  check "/collections/${slug}" 200
done
check "/about" 200
check "/privacy" 200
check "/terms" 200
check "/robots.txt" 200
check "/sitemap.xml" 200
check "/icon" 200
check "/opengraph-image" 200
check "/random-unknown-path" 404

echo
echo "=== 404 BODY (unknown path) ==="
curl -s "${BASE}/random-unknown-path" | grep -c "Page Not Found" | sed 's/^/Page Not Found occurrences: /'
echo "Header/Footer present on 404:"
curl -s "${BASE}/random-unknown-path" | grep -c "GALLERY HELLO" | sed 's/^/  logo matches: /'

echo
echo "=== 404 STATUS (unknown collection) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${BASE}/collections/does-not-exist"
curl -s "${BASE}/collections/does-not-exist" | grep -c "Page Not Found" | sed 's/^/Page Not Found occurrences: /'

echo
echo "=== IMAGE AVAILABILITY (from the data file) ==="
# Read the image URLs straight from the catalogue so the check follows
# whatever source the data points at.
IMAGE_URLS=$(python3 -c "
import json
for c in json.load(open('data/collections.json')):
    print(c['coverImage'])
    for p in c['previewImages']:
        print(p)
")
missing=0
total=0
for url in $IMAGE_URLS; do
  total=$((total + 1))
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" != "200" ]; then
    echo "  MISSING ${url} -> ${code}"
    missing=$((missing + 1))
  fi
done
echo "Images checked: ${total}, missing: ${missing}"

echo
echo "=== NO UNLOCK / AUTH / PAYMENT CONTROLS ==="
for path in "/" "/explore" "/about" "/privacy" "/terms"; do
  body=$(curl -s "${BASE}${path}")
  hits=$(printf '%s' "$body" | grep -io "unlock now\|sign in\|log in\|sign up\|add to favourites\|buy now\|subscribe now\|checkout\|top up" | wc -l | tr -d ' ')
  printf "  %-38s forbidden-control hits: %s\n" "$path" "$hits"
done

echo
echo "=== SITEMAP ENTRIES ==="
curl -s "${BASE}/sitemap.xml" | grep -c "<url>" | sed 's/^/url count: /'

echo
echo "=== ROBOTS ==="
curl -s "${BASE}/robots.txt"

kill "$SERVER_PID" 2>/dev/null
wait "$SERVER_PID" 2>/dev/null
echo
echo "=== DONE ==="
