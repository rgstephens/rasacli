## ToDo

* addtraining - with Markdown support, see below and issue [4076](https://github.com/RasaHQ/rasa/issues/4076)
* deldomain - not currently supported by API, see [4080](https://github.com/RasaHQ/rasa/issues/4080)
* Add verbose option, shows API calls, login process
* Add id to getStories
* Get training data needs to handled chunked response for large datasets

#### Training Markdown

The `POST` call to add training data currenly only supports JSON, not Markdown. Methods of converting Markdown to JSON:

* `rasa.nlu.convert.convert_training_data` described [here](https://gist.github.com/nmstoker/04355dc113608fe88b999ea1b95fb355)