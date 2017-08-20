/* eslint-disable no-console */
const fetch = require('node-fetch');
const qs = require('qs');

// Get just the query string from the
const getDeployEvent = (event) => {
  const body = qs.parse(event.body);
  // Logging
  console.log(`Parsed event query string: ${JSON.stringify(body)}`);
  return body;
};

const constructMessage = (event) => {
  // edit this function to change how the message looks in Slack
  // available data here: http://devcenter.heroku.com/articles/deploy-hooks#http_post_hook
  const app = event.app;
  const user = event.user;
  const release = event.release;
  const head = event.head;
  const gitLog = event.git_log;

  const message = `_ ${user} deployed _
  \tApp: *${app}*
  \tRelease version: *${release}*
  \tGit log: _"${gitLog}"_`;

  return message;
};

// Invoke action endpoint, if valid request.
const forwardToSlack = (message) => {
  if (!message) {
    console.log('Your event was bogus, chump.');
    throw Error('Your event was bogus, chump.');
  };

  const slackWebhookUrl = process.env.WEBHOOK_URL;
  console.log(`Forwarding deploy message: ${message} to slack url: ${slackWebhookUrl}`);
  const request = {
    ContentType: 'application/json',
    body: JSON.stringify({text: message}),
    method: 'post'
  };
  fetch(slackWebhookUrl, request)
    .then(response => response.json());
};

module.exports.handler = (event, context, callback) =>
  Promise.resolve(event) // Start the promise chain
    .then(getDeployEvent)
    .then(constructMessage)
    .then(forwardToSlack) // Invoke action function
    .catch(r => { statusCode: 500 });
