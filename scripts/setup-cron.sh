#!/bin/bash

# Setup daily cron job for accountability logs

SCRIPT_PATH="$HOME/projects/bill-crandell-dev/scripts/generate-daily-log.sh"
CRON_CMD="0 20 * * * $SCRIPT_PATH >> $HOME/logs/daily-log.log 2>&1"

# Create logs directory
mkdir -p "$HOME/logs"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "generate-daily-log.sh"; then
    echo "Cron job already exists"
    crontab -l
else
    # Add to crontab
    (crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -
    echo "✅ Cron job added - will run daily at 8 PM"
    echo ""
    echo "Current crontab:"
    crontab -l
fi

echo ""
echo "To view logs: tail -f $HOME/logs/daily-log.log"
echo "To remove cron: crontab -e (then delete the line)"
