import React from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';

import RegisterForm from 'components/forms/Register';

class RegisterRoute extends React.Component {
  render() {
    return (
      <div className="register-route">
        <Container>
          <Row>
            <Col sm={{size: 4, offset: 4}}>
              <Card>
                <RegisterForm />
              </Card>
            </Col>
          </Row>
          <div className="footer-container text-center m-4">
            <Button
              color="link"
              onClick={() => this.props.history.push("/auth/login")}
              children="I already have an account"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default RegisterRoute;
