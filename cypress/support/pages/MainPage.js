require('cypress-xpath');

class MainPage {
  constructor() {
    if (MainPage.instance == null) {
      this.firstNameInput = 'input#vfb-5';
      this.lastNameInput = 'input#vfb-7';
      this.maleRadioBtn = 'input#vfb-31-1';
      this.femaleRadioBtn = 'input#vfb-31-2';
      this.otherRadioBtn = 'input#vfb-31-3';
      this.addressInput = 'input#vfb-13-address';
      this.addressCity = 'input#vfb-13-zip';
      this.streetAddress = 'input#vfb-13-address-2';
      this.zipcodeInput = 'input#vfb-13-zip';
      this.countrySelect = 'select#vfb-13-country';
      this.hourDropdown = '//li[@id="item-vfb-16"]';
      this.emailInput = 'input#vfb-14';
      this.dateOfDemo = 'input#vfb-18';
      this.hourSelect = 'select#vfb-16-hour';
      this.hourContainer = '#select2-vfb-16-hour-container';
      this.hourContainerDropdown =
        '//span[@class="select2-search select2-search--dropdown"]/input';
      this.minContainer = '#select2-vfb-16-min-container';
      this.minContainerDropdown =
        '//span[@class="select2-search select2-search--dropdown"]/input';
      this.mobileNumberInput = 'input#vfb-19';
      this.seleniumCheckbox = 'input#vfb-20-0';
      this.uftCheckbox = 'input#vfb-20-1';
      this.testNgCheckbox = 'input#vfb-20-2';
      this.coreJavaCheckbox = 'input#vfb-20-3';
      this.functionalTestCheckbox = 'input#vfb-20-4';
      this.othersCheckbox = 'input#vfb-20-5';
      this.queryTextArea = 'textarea#vfb-23';
      this.verificationLabel = '//span//label[contains(text(), "Example")]';
      this.verificationInput = 'input#vfb-3';
      this.submitBtn = 'input#vfb-4';
      this.form = 'form#registration-1';

      MainPage.instance = this;
    }
    return MainPage.instance;
  }

  getForm() {
    return cy.get(this.form);
  }
  getSubmitBtn() {
    return cy.get(this.submitBtn);
  }

  getOthersCheckbox() {
    return cy.get(this.othersCheckbox);
  }

  getCodeJavaCheckbox() {
    return cy.get(this.coreJavaCheckbox);
  }

  getUtfCheckBox() {
    return cy.get(this.uftCheckbox);
  }

  getVerificationInput() {
    return cy.get(this.verificationInput);
  }

  getOtherRadioBtn() {
    return cy.get(this.otherRadioBtn);
  }
  getTestNgCheckbox() {
    return cy.get(this.testNgCheckbox);
  }
  getVerificationLabel() {
    return cy.xpath(this.verificationLabel);
  }

  getFemaleRadioBtn() {
    return cy.get(this.femaleRadioBtn);
  }
  getQueryTextArea() {
    return cy.get(this.queryTextArea);
  }
  getSeleniumCheckbox() {
    return cy.get(this.seleniumCheckbox);
  }
  getMobileNumberInput() {
    return cy.get(this.mobileNumberInput);
  }

  getMinContainerDropdown() {
    return cy.xpath(this.minContainerDropdown);
  }

  getMinContainer() {
    return cy.get(this.minContainer);
  }

  getHourContainerDropdown() {
    return cy.xpath(this.hourContainerDropdown);
  }

  getHourContainer() {
    return cy.get(this.hourContainer);
  }
  getFirstNameInput() {
    return cy.get(this.firstNameInput);
  }

  getHourDropDown() {
    return cy.xpath(this.hourDropdown);
  }

  getDateOfDemo() {
    return cy.get(this.dateOfDemo);
  }

  getHourSelect() {
    return cy.get(this.hourSelect);
  }
  getLastNameInput() {
    return cy.get(this.lastNameInput);
  }
  getLastName() {
    return cy.get(this.lastNameInput);
  }

  getAddress() {
    return cy.get(this.addressInput);
  }

  getEmailInput() {
    return cy.get(this.emailInput);
  }

  getStreetAddress() {
    return cy.get(this.streetAddress);
  }
  getCity() {
    return cy.get(this.addressCity);
  }
  getMaleRadioBtn() {
    return cy.get(this.maleRadioBtn);
  }

  getCountrySelect() {
    return cy.get(this.countrySelect);
  }
}

const mainPage = new MainPage();
export default mainPage;
