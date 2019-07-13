import React from 'react';
import { withFormik, Field } from 'formik';
import { Row, Col, Form, FormGroup, Input, FormFeedback, FormText, Label } from 'reactstrap';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import ModalCancelButton from 'components/buttons/ModalCancelButton';
import LoadButton from 'components/buttons/LoadButton';
import createAsset, { CREATE_ASSET_SUCCESS, CREATE_ASSET_FAILURE } from 'actions/assets/create';
import { hideModal } from 'actions/general/modals';

const AssetForm = props => {
  const {
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    status
  } = props;

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <FormGroup>
        <Label>Asset name</Label>
        <Input
          placeholder="citibank, house, etrade, etc"
          name="name"
          tag={Field}
          invalid={errors.name && touched.name}
        />
        <FormFeedback>{errors.username}</FormFeedback>
      </FormGroup>
      <Row form>
        <Col>
          <FormGroup>
            <Label>Asset type</Label>
            <Input
              type="select"
              component="select"
              placeholder="type"
              name="type"
              tag={Field}
              invalid={errors.type && touched.type}
            >
              <option value="current">Current</option>
              <option value="fixed">Fixed</option>
              <option value="finance">Financial</option>
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

      <div className="button-container text-right">
        <ModalCancelButton />
        <LoadButton
          color="primary"
          type="submit"
          disabled={isSubmitting}
          width={120}
          isLoading={isSubmitting}
        >
          Create Asset
        </LoadButton>
      </div>
    </Form>
  );
}

const FormikForm = withFormik({
  mapPropsToValues: props => ({
    name: '',
    type: 'current',
    value: ''
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required(),
    value: Yup.number().integer().required()
  }),

  handleSubmit: async (values, { props, setSubmitting, setStatus }) => {
    const action = await props.createAsset(values);
    setSubmitting(false);
    if (action.type === CREATE_ASSET_FAILURE) {
      setStatus({ error: action.error});
    } else if (action.type === CREATE_ASSET_SUCCESS) {
      toast('New asset created');
      props.hideModal();
    }
  },
})(AssetForm);

export default connect(null, { createAsset, hideModal })(FormikForm);
