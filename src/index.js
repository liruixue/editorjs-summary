/**
 * Summary block for the Editor.js.
 *
 * @author Vishal Telangre
 * @license MIT
 */

/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Import Tool's icon
 */
import ToolboxIcon from '../assets/icon.svg';

/**
 * @class Summary
 * @classdesc Summary Tool for Editor.js
 * @property {SummaryData} data - Summary Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} SummaryData
 * @description Summary Tool`s input and output data
 * @property {string} type - Summary type
 * @property {string} message - Summary message
 *
 * @typedef {object} SummaryConfig
 * @description Summary Tool`s initial configuration
 * @property {string} defaultType - default Summary type
 * @property {string} messagePlaceholder - placeholder to show in Summary`s message input
 */
export default class Summary {
  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Summary',
    };
  }

  /**
   * Allow to press Enter inside the Summary block
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Default Summary type
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TYPE() {
    return 'info';
  }

  /**
   * Default placeholder for Summary message
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return 'Type here...';
  }

  /**
   * Supported Summary types
   *
   * @public
   * @returns {array}
   */
  static get ALERT_TYPES() {
    return [
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'danger',
      'light',
      'dark',
    ];
  }

  /**
   * Summary Tool`s styles
   *
   * @returns {Object}
   */
  get CSS() {
    return {
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
      wrapper: 'cdx-summary',
      wrapperForType: (type) => `cdx-summary-${type}`,
      message: 'cdx-summary__message',
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {SummaryData} data — previously saved data
   * @param {SummaryConfig} config — user config for Tool
   * @param {Object} api - Editor.js API
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;

    this.defaultType = config.defaultType || Summary.DEFAULT_TYPE;
    this.messagePlaceholder =
      config.messagePlaceholder || Summary.DEFAULT_MESSAGE_PLACEHOLDER;

    this.data = {
      type: Summary.ALERT_TYPES.includes(data.type)
        ? data.type
        : this.defaultType,
      message: data.message || '',
    };

    this.container = undefined;
    
    this.readOnly = readOnly;
  }
  
  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @return {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Create Summary Tool container
   *
   * @returns {Element}
   */
  render() {
    const containerClasses = [
      this.CSS.wrapper,
      this.CSS.wrapperForType(this.data.type),
    ];

    this.container = this._make('div', containerClasses);

    const messageEl = this._make('div', [this.CSS.message], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.message,
    });

    messageEl.dataset.placeholder = this.messagePlaceholder;

    this.container.appendChild(messageEl);

    return this.container;
  }

  /**
   * Create Block's settings block
   *
   * @returns {HTMLElement}
   */
  renderSettings() {
    const settingsContainer = this._make('div');

    Summary.ALERT_TYPES.forEach((type) => {
      const settingsButton = this._make(
        'div',
        [
          this.CSS.settingsButton,
          this.CSS.wrapper,
          this.CSS.wrapperForType(type),
        ],
        {
          innerHTML: 'A',
        }
      );

      if (this.data.type === type) {
        // Highlight current type button
        settingsButton.classList.add(this.CSS.settingsButtonActive);
      }

      // Set up click handler
      settingsButton.addEventListener('click', () => {
        this._changeSummaryType(type);

        // Un-highlight previous type button
        settingsContainer
          .querySelectorAll(`.${this.CSS.settingsButton}`)
          .forEach((button) =>
            button.classList.remove(this.CSS.settingsButtonActive)
          );

        // and highlight the clicked type button
        settingsButton.classList.add(this.CSS.settingsButtonActive);
      });

      settingsContainer.appendChild(settingsButton);
    });

    return settingsContainer;
  }

  /**
   * Helper for changing style of Summary block with the selected Summary type
   *
   * @param {string} newType - new Summary type to be applied to the block
   * @private
   */
  _changeSummaryType(newType) {
    // Save new type
    this.data.type = newType;

    Summary.ALERT_TYPES.forEach((type) => {
      const summaryClass = this.CSS.wrapperForType(type);

      // Remove the old Summary type class
      this.container.classList.remove(summaryClass);

      if (newType === type) {
        // Add an Summary class for the selected Summary type
        this.container.classList.add(summaryClass);
      }
    });
  }

  /**
   * Extract Summary data from Summary Tool element
   *
   * @param {HTMLDivElement} summaryElement - element to save
   * @returns {SummaryData}
   */
  save(summaryElement) {
    const messageEl = summaryElement.querySelector(`.${this.CSS.message}`);

    return { ...this.data, message: messageEl.innerHTML };
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @returns {Element}
   * @private
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  /**
   * Fill Summary's message with the pasted content
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event) {
    const { data } = event.detail;

    this.data = {
      type: this.defaultType,
      message: data.innerHTML || '',
    };
  }

  /**
   * Allow Summary to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      // export Summary's message for other blocks
      export: (data) => data.message,
      // fill Summary's message from other block's export string
      import: (string) => {
        return {
          message: string,
          type: this.DEFAULT_TYPE,
        };
      },
    };
  }

  /**
   * Sanitizer config for Summary Tool saved data
   * @returns {Object}
   */
  static get sanitize() {
    return {
      type: false,
      message: true,
    };
  }
}
