import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row, Col } from 'reactstrap';

import { showModal } from 'actions/general/modals';
import DashboardHeader from 'components/dashboard/Header';
import WorthTypeContainer from 'components/worth/TypeContainer';
import WorthTotalContainer from 'components/worth/TotalContainer';
import EmptyItemsContainer from 'components/worth/EmptyItemsContainer';
import './style.scss';

class AssetsRoute extends React.Component {
  render() {
    const assetData = this.props.worthItems.data.filter(item => item.category === "asset");
    const renderEmptyAssets = () => {
      if (assetData.length === 0)
        return <EmptyItemsContainer category="liabilities" />;
    }

    const renderAssets = (assetType) => {
      const assets = assetData.filter(asset => asset.type === assetType);
      if (assets.length === 0) return null;

      return (
        <Col md={6} sm={12}>
          <WorthTypeContainer worthItems={assets} category="assets" type={assetType} />
        </Col>
      );
    }

    return (
      <Container className="assets-route p-4">
        <DashboardHeader className="text-right">
          <Button
            color="primary"
            outline
            onClick={() => this.props.showModal("worthItem", { category: "asset" })}
          >
            Create Asset
          </Button>
        </DashboardHeader>
        {renderEmptyAssets()}
        <WorthTotalContainer worthItems={assetData} category="assets" />
        <Row>
          {renderAssets('current_asset')}
          {renderAssets('fixed_asset')}
          {renderAssets('financial_asset')}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ worthItems }) => ({ worthItems });
export default connect(mapStateToProps, { showModal })(AssetsRoute);
