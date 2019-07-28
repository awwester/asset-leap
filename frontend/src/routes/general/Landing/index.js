import React from 'react';
import { Row, Col } from 'reactstrap';

import HomeNav from 'components/navigation/Home';
import './style.scss';

class LandingRoute extends React.Component {
  render() {
    return (
      <div className="landing-route">
        <HomeNav />

        <section className="features">
          <Row>
            <Col sm={8}>
              <img src="/images/statements.png" className="shadow-lg" alt="personal net worth statements"/>
            </Col>
            <Col sm={4} className="feature-summary">
              <h2>Net worth statements</h2>
              <p>Whether it be months, quarters or years - you can make your own accounting periods and track your financial growth.</p>
            </Col>
          </Row>

          <Row>
            <Col className="feature-summary"  sm={4}>
              <h2>Track assets and liabilities</h2>
              <p>As your assets and liabilities change, you can modify their values and be aware of changes over time.</p>
            </Col>
            <Col sm={8}>
              <img src="/images/assets.png" className="shadow-lg" alt="track assets"/>
            </Col>
          </Row>

          <Row>
            <Col sm={8}>
              <img src="/images/statement_detail.png" className="shadow-lg"  alt="personal worth tracking"/>
            </Col>
            <Col sm={4} className="feature-summary">
              <h2>View statement periods</h2>
              <p>Each period you can view the details of what your assets and liabilities were at that time.</p>
            </Col>
          </Row>
        </section>
      </div>
    )
  }
}

export default LandingRoute;
