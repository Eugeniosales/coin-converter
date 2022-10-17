<h1 align="center">
Solução do conversor de moedas
</h1>

<p align="center">Solução para conversão de moeds de acordo a taxa de câmbio corrente</p>

<hr>

## Organização

Para organização do problema, foram abertas as seguintes issues, onde na descrição das substasks é possível acompanhar como a solução foi organizada:

1. [Configuração inicial do projeto](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/issues/1)
2. [Documentação](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/issues/2)
3. [Job para obtenção das taxas de câmbio em tempo real da API externa Exchange Rate](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/issues/3)
4. [Microsserviço para consulta da taxas de câmbio](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/issues/4)
5. [Microsserviço para listagem de produtos com a moeda corrente requerida](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/issues/6)

## Documentação da API

A utlização da API de produtos pode ser verificada na wiki na página: [Documentação da API de Produtos](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/wiki/%5BDocumenta%C3%A7%C3%A3o%5D-API-de-Produtos)
## Arquitetura da solução

- Para apresentação e justificava das escolhas, foi construída uma ADR (Architecture Decision Records) que pode ser consultada na wiki: [ADR da solução do conversor de moedas](https://github.com/Eugeniosales/eng-gruposbf-backend-typescript/wiki/%5BDocumenta%C3%A7%C3%A3o%5D-ADR-da-solu%C3%A7%C3%A3o-do-conversor-de-moedas)

## Princípios de Software

<p align="center">
    <img src="./assets/clean_archicteture.png" alt="Logo" width=600>
</p>

1. A arquitetura da aplicação seguiu o Clean Architecture. De acordo a figura acima, os módulos possuem a seguinte correspondência:

* [domain](./src/1-domain): Enterprise Business Rules
* [business](./src/2-business): Application Business Rules
* [adapters](./src/3-adapters): Interface adapters
* [framework](./src/4-framework): Framework & Drivers

2. Além disso foram empregados princípios do Clean Code, Solid e Design Patterns (Dependency Injection e Repository Pattern)
3. Para testes, foram realizados testes unitários nas camadas de [business](./src/2-business) e [adapters](./src/3-adapters)
## Infra

* Para o provionamento e Configuração das Lambdas foi utilizado o Serverless Framework
* Os demais recursos da AWS foram provisados com o Terraform
* O CI/CD foi configurado com o Github Pipelines

## Referências

* [Clean Architecture - jbuget](https://github.com/jbuget/nodejs-clean-architecture-app)
