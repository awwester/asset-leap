import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { showModal } from 'actions/general/modals';
import DashboardHeader from 'components/dashboard/Header';
import DashboardContainer from 'components/dashboard/Container';
import AssetRow from 'components/assets/Row';
import './style.scss';

class AssetsRoute extends React.Component {
  render() {
    const assetData = this.props.assets.data;

    const totalAssetsSum = assetData
      .map(asset => asset.value)
      .reduce((prev, curr) => prev + curr, 0);

    const renderEmptyAssets = () => {
      if (assetData.length === 0)
        return (
          <DashboardContainer>
            <FontAwesomeIcon icon={faExclamationCircle} className="warning-icon" />
            You don't have any assets yet.
          </DashboardContainer>
        );
    }

    const renderAssets = (assetType) => {
      const assets = assetData.filter(asset => asset.type === assetType);
      if (assets.length === 0) return null;

      const sum = assets.map(asset => asset.value).reduce((prev, curr) => prev + curr, 0);

      return (
        <Col md={6} sm={12}>
          <DashboardContainer className={`asset-type-container ${assetType}-assets`}>
            <h4 className="asset-type-name">{assetType} Assets</h4>
            {assets.map((asset) => <AssetRow key={asset.id} asset={asset} />)}
            <Row className="asset-type-footer pt-3 px-3">
              <Col><strong>Total</strong></Col>
              <Col><strong>${sum}</strong></Col>
              <Col />
            </Row>
          </DashboardContainer>
        </Col>
      );
    }

    const renderTotalAssets = () => {
      if (assetData.length > 0)
        return (
          <Row className="text-center my-5">
            <Col>
              <h2>Total assets <strong>${totalAssetsSum}</strong></h2>
            </Col>
          </Row>
        );
    }

    return (
      <Container className="assets-route p-4">
        <DashboardHeader>
          <Button
            color="primary"
            outline
            onClick={() => this.props.showModal("asset")}
          >
            Create Asset
          </Button>
        </DashboardHeader>
        {renderEmptyAssets()}
        {renderTotalAssets()}
        <Row>
          {renderAssets('current')}
          {renderAssets('fixed')}
          {renderAssets('finance')}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ assets }) => ({ assets });
export default connect(mapStateToProps, { showModal })(AssetsRoute);
