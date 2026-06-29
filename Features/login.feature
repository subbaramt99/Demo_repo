Feature: login

Background: 
     Given launch the application

Scenario: login with valid credentials
    When I enter valid credentials 
    And I click the login button
    Then I should be redirected to the dashboard page

Scenario: login with invalid credentials
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message

Scenario: login with admin credentials
    When I enter admin credentials
    And I click the login button
    Then I should see an error message