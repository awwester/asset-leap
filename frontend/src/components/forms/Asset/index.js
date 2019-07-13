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
import createAsset from 'actions/assets/create';
import updateAsset from 'actions/assets/update';
import deleteAsset, { DELETE_ASSET_SUCCESS } from 'actions/assets/delete';
import { hideModal } from 'actions/general/modals';

class AssetForm extends React.Component {
  deleteAsset = async (assetId) => {
    const action = await this.props.deleteAsset(assetId);
    if (action.type === DELETE_ASSET_SUCCESS) {
      toast('Asset deleted successfully');
      this.props.hideModal();
    } else {
      toast.danger('Error deleting asset.');
    }
  }

  render() {
    const {
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      status,
      asset
    } = this.props;

    const renderDeleteAsset = () => {
      if (!asset)
        return null;

      return (
        <Button
          color="danger"
          className="float-left"
          onClick={() => this.deleteAsset(this.props.asset.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      );
    }

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
          <FormFeedback>{errors.name}</FormFeedback>
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

        {renderDeleteAsset()}
        <div className="button-container text-right">
          <ModalCancelButton />
          <LoadButton
            color="primary"
            type="submit"
            disabled={isSubmitting}
            width={140}
            isLoading={isSubmitting}
          >
            {asset ? 'Update' : 'Create'} Asset
          </LoadButton>
        </div>
      </Form>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    if (props.asset) {
      return {
        name: props.asset.name,
        type: props.asset.type,
        value: props.asset.value
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
    // Either create a new asset or update an existing one.
    let actionCreator;
    if (props.asset)
      actionCreator = () => props.updateAsset(props.asset.id, values)
    else
      actionCreator = () => props.createAsset(values);

    const action = await actionCreator();
    setSubmitting(false);

    if (action.type.includes("_ASSET_FAILURE"))
      return setStatus({ error: action.error});

    toast(props.asset ? `${values.name} updated` : `${values.name} created`);
    return props.hideModal();
  },
})(AssetForm);

export default connect(null, { createAsset, updateAsset, deleteAsset, hideModal })(FormikForm);
