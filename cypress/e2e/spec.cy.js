describe('API de Pagamento', () => {

  it('deve validar todos os cenários de pagamento da fixture', () => {
    cy.fixture('DadosCartao').then((testCases) => {
      // Use o Cypress.Promise.each para iterar sobre a fixture
      Cypress.Promise.each(testCases, (testCase) => {
        cy.log(`Testando cenário: ${testCase.description}`);
        
        cy.api({
          method: 'POST',
          url: 'http://localhost:3000/payment',
          body: testCase.data,
          failOnStatusCode: false
        }).should(({ status, body }) => {
          expect(status).to.eq(testCase.expectedStatus);

          if (testCase.expectedStatus === 200) {
            expect(body.status).to.eq('success');
            expect(body.message).to.eq(testCase.expectedMessage);
          } else {
            expect(body.status).to.eq('error');
            expect(body.message).to.eq(testCase.expectedMessage);
          }
        });
      });
    });
  });
});