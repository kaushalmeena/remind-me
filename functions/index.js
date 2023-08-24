// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

exports.eventReminder = onSchedule("every day 00:00", async (event) => {
  logger.log("Event fired");
});
