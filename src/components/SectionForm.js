import React from 'react';
import _ from 'lodash';

import emailjs from 'emailjs-com'
import {markdownify} from '../utils';
import FormField from './FormField';
import { navigate } from 'gatsby';

export default class SectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {};
    }

    submit(section_id) {
        if (section_id && section_id === 'contact-form') {
            emailjs.init(process.env.GATSBY_EMAILJS_USER); // TODO: Check if we can pass this in a secure way

            const name = _.get(this.state, 'name', null);
            const message = _.get(this.state, 'message', null)

            if (name && message) {
                emailjs.send(
                    process.env.GATSBY_EMAILJS_SERVICE, 
                    process.env.GATSBY_EMAILJS_TEMPLATE,
                    { 
                      from_name: name, 
                      message: message, 
                      subject: _.get(this.state, 'subject', null) 
                    })
                    .then(error => {
                        console.log('Email successfully sent!');
                        navigate('/thank-you');
                    })
                    .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
            }
        }
    }

    onChange(section_id, field_name, field_value) {
        if (section_id && section_id === 'contact-form') {
            const newState = Object.assign({}, this.state);
            newState[field_name] = field_value;
            this.setState(newState);
            console.log(`Updated ${field_name} to ${field_value}`);
        }
    }

    render() {
        const section = _.get(this.props, 'section', null);
        const sectionId = _.get(section, 'section_id', null);

        return (
            <section id={sectionId} className="block block-form">
              {_.get(section, 'title', null) && (
              <h2 className="block-title underline inner-sm">{_.get(section, 'title', null)}</h2>
              )}
              <div className="block-content inner-sm">
                {_.get(section, 'content', null) && (
                markdownify(_.get(section, 'content', null))
                )}
                <form name={_.get(section, 'form_id', null)} onSubmit={(e) => {this.submit(sectionId); e.preventDefault();}} id={_.get(section, 'form_id', null)} {...(_.get(section, 'form_action', null) ? ({action: _.get(section, 'form_action', null)}) : null)}method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                  <div className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </div>
                  <input type="hidden" name="form-name" value={_.get(section, 'form_id', null)} />
                  {_.map(_.get(section, 'form_fields', null), (field, field_idx) => (
                    <FormField key={field_idx} {...this.props} field={field} onChange={(e) => this.onChange(sectionId, field.name, e.target.value)} />
                  ))}
                  <div className="form-submit">
                    <button type="submit" className="button">{_.get(section, 'submit_label', null)}</button>
                  </div>
                </form>
              </div>
            </section>
        );
    }
}
