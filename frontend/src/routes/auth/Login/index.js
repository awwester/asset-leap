import React from 'react';
import { Container, Row, Col, Card, Button } from 'reactstrap';

import LoginForm from 'components/forms/Login';

class LoginRoute extends React.Component {
  render() {
    return (
      <div className="login-route">
        <Container>
          <Row>
            <Col sm={{size: 4, offset: 4}}>
              <Card>
                <LoginForm />
              </Card>
            </Col>
          </Row>
          <div className="footer-container text-center m-4">
          <Button
            color="link"
            onClick={() => this.props.history.push("/auth/register")}
            children="Create new account"
          />
          </div>
        </Container>
      </div>
    );
  }
}

export default LoginRoute;
