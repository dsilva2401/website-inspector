Guppy: A node js framework based on ExpressJS
-----------------------------------------------------

*Guppy is an open source NodeJS Framework based on ExpressJS,
the goal is to structure code and promote good programming practices providing a seed and some rules.*

## Seed structure

```bash
app.js 			# Main file
config.js 		# App configuration
public/.. 		# Contains public static files
src/ 			# App source files
	init/..
	front/..
	global/..
	models/..
	routes/..
	methods/..
	settings/..
```

## Modules

![](docs/global-structure.png)

*Each arrow represents the connection of the modules, for example `Init` module just have access to `Methods` module.*


## Links
- http://sequelize.readthedocs.org/en/latest/
- http://www.ijitee.org/attachments/File/v3i2/B1010073213.pdf
- https://en.wikipedia.org/wiki/Software_framework
- https://www.nsa.gov/ia/_files/support/guidelines_implementation_rest.pdf