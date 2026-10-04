#!/bin/bash
# Netlify runs this on every deploy. Keys come from Netlify environment variables, never from GitHub.
set -e
: "${SUPABASE_URL:?Set SUPABASE_URL in Netlify environment variables}"
: "${SUPABASE_KEY:?Set SUPABASE_KEY in Netlify environment variables}"
rm -rf dist && mkdir dist
sed -e "s|%%SUPABASE_URL%%|${SUPABASE_URL}|g" -e "s|%%SUPABASE_KEY%%|${SUPABASE_KEY}|g" index.html > dist/index.html
cp sw.js manifest.json dist/
