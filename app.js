const express = require( 'express' );
const app = express();
const swaggerUI = require( 'swagger-ui-express' );
const swaggerDocument = require( './swagger.json' );
const PORT = process.env.PORT || 3000

var pets = [ { id: 0, name: "Kai", type: "Dog" }, { id: 1, name: "Xena", type: "Cat" } ];

app.use( express.json() );
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( swaggerDocument ));

app.get( "/pets", ( req, res ) => {
    res.send( pets );
});

app.post( '/pets', ( req, res) => {
    pets.push({ id: req.body.id, name: req.body.name, type: req.body.type });
    res.send( `New pet added: ${JSON.stringify(pets)}` )
});

app.delete( '/pets/:id', ( req, res ) => {
    console.log( `delete: id: ${req.params.id}` );
    pets = pets.filter( pet => pet.id != req.params.id );
    res.send( `Pets remaining: ${JSON.stringify( pets )}`);
});

app.listen( PORT, () => {
    console.log( `Listening to PORT: ${PORT}` )
});