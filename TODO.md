## ToDo

* addtraining - with Markdown support, see below and issue [4076](https://github.com/RasaHQ/rasa/issues/4076)
* deldomain - not currently supported by API, see [4080](https://github.com/RasaHQ/rasa/issues/4080)
* Add verbose option, shows API calls, login process
* Add id to getStories
* Get training data needs to handled chunked response for large datasets

#### Training Markdown

The `POST` call to add training data currenly only supports JSON, not Markdown. Methods of converting Markdown to JSON:

* `rasa.nlu.convert.convert_training_data` described [here](https://gist.github.com/nmstoker/04355dc113608fe88b999ea1b95fb355)

### Intermittent Domain `PUT` Issues

I delete the intent `mood_great` from my domain.yml file and also delete the `utter_greet` action and template. I change the name of the `greet` intent to `greet_greg` and change the action and template called `utter_greet` to `utter_greet_greg`. Then I run the `POST` on the updated domain.yml and the domain in the UI shows the following (no changes other than re-ordering the first two intents):

```
intents:
  - goodbye
  - greet
  - mood_affirm
  - mood_deny
  - mood_great
templates:
  utter_greet:
    - text: Hey! How are you?
  utter_did_that_help:
    - text: Did that help you?
  utter_happy:
    - text: Great carry on!
  utter_goodbye:
    - text: Bye
actions:
  - utter_greet
  - utter_did_that_help
  - utter_happy
  - utter_goodbye
```

I then create an empty domain.yml file and call the `PUT` on that file. The put returns a status of 200 but no changes are made to the domain.
