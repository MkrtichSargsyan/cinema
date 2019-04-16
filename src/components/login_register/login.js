import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {auth} from '../../firebase';


class Login extends React.Component {

    state = {
        email: '',
        password: '',
    };

    onSubmit = (e) => {
        e.preventDefault();

        let {email, password} = this.state;

        auth.signInWithEmailAndPassword(
            email,
            password
        ).then((a) => {
            console.log(a);
        }).catch(error => console.log(error));

        this.props.clicked();
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: "20px"
                }}>

                </div>

                <Form onSubmit={this.onSubmit}>

                    <Form.Field>
                        <label htmlFor={'email'}>Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='example@example.com'
                            value={email}
                            onChange={this.onChange}
                            className='input-of-form'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor={'password'}>Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='please enter your password'
                            value={password}
                            onChange={this.onChange}
                            className='input-of-form'
                        />
                    </Form.Field>


                    <Button primary>Log in</Button>
                    <Button primary onClick={this.props.canceled}>Cancel</Button>

                </Form>

            </div>
        );
    }
}

export default Login;



