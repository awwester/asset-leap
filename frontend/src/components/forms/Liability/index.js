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
import createLiability from 'actions/liabilities/create';
import updateLiability from 'actions/liabilities/update';
import deleteLiability, { DELETE_LIABILITY_SUCCESS } from 'actions/liabilities/delete';
import { hideModal } from 'actions/general/modals';

class LiabilityForm extends React.Component {
  deleteLiability = async (liabilityId) => {
    const action = await this.props.deleteLiability(liabilityId);
    if (action.type === DELETE_LIABILITY_SUCCESS) {
      toast('Liability deleted successfully');
      this.props.hideModal();
    } else {
      toast.danger('Error deleting liability.');
    }
  }

  render() {
    const {
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      status,
      liability
    } = this.props;

    const renderDeleteLiability = () => {
      if (!liability)
        return null;

      return (
        <Button
          color="danger"
          className="float-left"
          onClick={() => this.deleteLiability(this.props.liability.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      );
    }

    return (
      <Form onSubmit={handleSubmit} className="p-4">
        <FormGroup>
          <Label>Liability name</Label>
          <Input
            placeholder="home loan, taxes due, accounts payable, etc"
            name="name"
            tag={Field}
            invalid={errors.name && touched.name}
          />
          <FormFeedback>{errors.name}</FormFeedback>
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label>Liability type</Label>
              <Input
                type="select"
                component="select"
                placeholder="type"
                name="type"
                tag={Field}
                invalid={errors.type && touched.type}
              >
                <option value="current">Current</option>
                <option value="non-current">Non-current</option>
              </Input>

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

        {renderDeleteLiability()}
        <div className="button-container text-right">
          <ModalCancelButton />
          <LoadButton
            color="primary"
            type="submit"
            disabled={isSubmitting}
            width={160}
            isLoading={false}
          >
            {liability ? 'Update' : 'Create'} Liability
          </LoadButton>
        </div>
      </Form>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    if (props.liability) {
      return {
        name: props.liability.name,
        type: props.liability.type,
        value: props.liability.value
      };
    }

    return {
      name: '',
      type: 'current',
      value: ''
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required(),
    value: Yup.number().integer().required()
  }),

  handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
    // Either create a new liability or update an existing one.
    let actionCreator;
    if (props.liability)
      actionCreator = () => props.updateLiability(props.liability.id, values)
    else
      actionCreator = () => props.createLiability(values);

    const action = await actionCreator();
    setSubmitting(false);

    if (action.type.includes("_LIABILITY_FAILURE"))
      return setStatus({ error: action.error});

    toast(props.liability ? `${values.name} updated` : `${values.name} created`);
    return props.hideModal();
  },
})(LiabilityForm);

export default connect(null, { createLiability, updateLiability, deleteLiability, hideModal })(FormikForm);
