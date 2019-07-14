import React from 'react';
import { withFormik, Field } from 'formik';
import { Row, Col, Form, FormGroup, Input, FormFeedback, FormText, Label, Button } from 'reactstrap';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import ModalCancelButton from 'components/buttons/ModalCancelButton';
import LoadButton from 'components/buttons/LoadButton';
import createworthItem from 'actions/worthItems/create';
import updateworthItem from 'actions/worthItems/update';
import deleteworthItem from 'actions/worthItems/delete';
import { hideModal } from 'actions/general/modals';
import capitalize from 'utils/capitalize';

class worthItemForm extends React.Component {
  deleteworthItem = (worthItemId) => {
    this.props.deleteworthItem(worthItemId);
    toast(`${capitalize(this.category)} deleted successfully`);
    this.props.hideModal();
  }

  category = this.props.category || this.props.worthItem.category;

  render() {
    const {
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      status,
      worthItem
    } = this.props;

    const renderDeleteworthItem = () => {
      if (!worthItem)
        return null;

      return (
        <Button
          color="danger"
          className="float-left"
          onClick={() => this.deleteworthItem(this.props.worthItem.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      );
    }

    const renderSelectControl = () => {
      if (this.category === "asset") {
        return (
          <Input
            type="select"
            component="select"
            placeholder="type"
            name="type"
            tag={Field}
            invalid={errors.type && touched.type}
          >
            <option value="current_asset">Current Asset</option>
            <option value="fixed_asset">Fixed Asset</option>
            <option value="financial_asset">Financial Asset</option>
          </Input>
        );
      }

      return (
        <Input
          type="select"
          component="select"
          placeholder="type"
          name="type"
          tag={Field}
          invalid={errors.type && touched.type}
        >
          <option value="current_liab">Current Liability</option>
          <option value="noncurrent_liab">Noncurrent Liability</option>
        </Input>
      );
    }

    return (
      <Form onSubmit={handleSubmit} className="p-4">
        <FormGroup>
          <Label>{capitalize(this.category)} name</Label>
          <Input
            placeholder="citibank, house, etrade, etc"
            name="name"
            tag={Field}
            invalid={errors.name && touched.name}
          />
          <FormFeedback>{errors.name}</FormFeedback>
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label>{capitalize(this.category)} type</Label>
              {renderSelectControl()}
              <FormFeedback>{errors.type}</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Value amount</Label>
              <Input
                name="value"
                tag={Field}
                invalid={errors.value && touched.value}
              />
              <FormFeedback>{errors.value}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <FormText color="danger" className="text-center mb-3">
          {status ? status.error : ''}
        </FormText>

        {renderDeleteworthItem()}
        <div className="button-container text-right">
          <ModalCancelButton />
          <LoadButton
            color="primary"
            type="submit"
            disabled={isSubmitting}
            width={140}
            isLoading={isSubmitting}
          >
            {worthItem ? 'Update' : 'Create'} {this.category}
          </LoadButton>
        </div>
      </Form>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    if (props.worthItem) {
      return {
        name: props.worthItem.name,
        type: props.worthItem.type,
        value: props.worthItem.value
      };
    }

    return {
      name: '',
      type: props.category === "asset" ? "current_asset" : "current_liab",
      value: ''
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required(),
    value: Yup.number().integer().required()
  }),

  handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
    // Either create a new worthItem or update an existing one.
    let actionCreator;
    if (props.worthItem)
      actionCreator = () => props.updateworthItem(props.worthItem.id, values)
    else
      actionCreator = () => props.createworthItem(values);

    const action = await actionCreator();
    setSubmitting(false);

    if (action.type.includes("_WORTH_ITEM_FAILURE"))
      return setStatus({ error: action.error});

    toast(props.worthItem ? `${values.name} updated` : `${values.name} created`);
    return props.hideModal();
  },
})(worthItemForm);

export default connect(null, {
  createworthItem, updateworthItem, deleteworthItem, hideModal
})(FormikForm);
