/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};
//--------
 describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', (done) =>
      agent.get('/pokemons').expect(200)
    );
  });
  // describe("GET /types", () => {
  //   it("should get 200", () => 
  //   agent.get("/types")
  //   .send()
  //   .expect(200));
  // });
});
 
//
// describe("Rutas types", () => {
  
// });

// describe("Get pokemon by id or name", () => {
//   describe("GET/pokemons/:id", () => {
//     it("should get 200", () =>
//       agent.get("/pokemons/10").expect(200));
//   });
//   describe("GET/pokemons/:id", () => {
//     it("should get 200", () =>
//       agent.get("/pokemons/56480750-2a88-422b-8ccb-f0e789e45a78").expect(200));
//   });
//   describe("GET /pokemons/name=xxx", () => {
//     it("should get 200", () =>
//       agent.get("/pokemons/name=pikachu"));
//   });
  
// });