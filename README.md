# Serverless Slack Bot

## Setup
- Source your AWS credential in your bash profile. The Serverless CLI will find them there.
- Run `npm install -g serverless`
- From the root of this repo, run `npm install`
- Create an app in Slack. Do *NOT* install that app to your team just yet.
- Navigate to your app, and from the `Basic Configuration` option in the menu on the left, expand the `Add features and functionality` tab.
    + Click `Bots` and give a username for your bot. Make sure the bot is set to be `always online`
    + Back at the `features and functionality` menu, click on `Incoming Webhooks`
    + Turn the feature ON using the toggle button.
    + `Add a new webhook`, choosing the channel and posting options on the following screen, and authorize the bot.
    + Make a note of the URL for the webhook
- Open up `serverless.yml`
    + Back on the `Basic Information` screen, copy your Client ID, Secret, and webhook URL into the proper corresponding environment variables.
- Run `sls deploy` from your repo. The application will print your API Gateway endpoints to stdout.
    + Navigate to `Permissions` from the `Features and functionality` menu, select `Add a new redirect URL`, and paste in your install endpoint.
- Visit the slack button section in the [API docs](https://api.slack.com/docs/slack-button#add_the_slack_button)
    + Select your bot from the dropdown and check the boxes for `incoming webhook` and `bot`, then click `Add to slack`. You should be redirected to the redirect URL you set in your `serverless.yml` file.
- Log in to Heroku and add the HTTP deploy hook to your application. Paste in the URL for your `/deploy` endpoint.
- Run `sls deploy` to get your app fully updated.

## Running
Now any time you run a deploy, heroku will post the data to your pre-configured slack channel. 

## Customizing
To customize the message, open up `heroku.js` and update the `constructMessage` function. Find more details about the Heroku post in the [Heroku docs](http://devcenter.heroku.com/articles/deploy-hooks#http_post_hook)


## Next steps
You now have an application that you can extend to listen to other API's, such as the Events API. Installation adds your application's token to a Dynamo DB table that you can check out by logging into the AWS console in the proper region. 