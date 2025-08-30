#!/usr/bin/env bash
set -euo pipefail

API_BASE=${API_BASE:-http://localhost:8080/api}

echo "Firing sample click..."
curl -i "$API_BASE/click?offer_id=1&aff_id=1&sub1=test&tid=abc123"

echo "\nSimulate inbound S2S..."
TXID=${TXID:-01HXDEMOULID}
curl -i "$API_BASE/s2s?txid=$TXID&status=approved&revenue=1.50&payout=1.00&currency=USD&external_txid=ADV-999&sig=DEMO"

