import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'components/UI/Input/Input';
import CustomButton from 'components/UI/Button/CustomButton';
import classes from './Auth.module.css';
import * as actions from "store/actions/index";
import Spinner from 'components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        },
        isFormValid: false,
        isSignUpMode: true
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUpMode);
    }

    inputChangeHandler = (event, elName) => {
        const updatedControls = {
            ...this.state.controls,
            [elName] : {
                ...this.state.controls[elName],
                value: event.target.value,
                valid: this.checkIfValid(event.target.value, this.state.controls[elName].validation),
                touched: true,

            }
        };
        const updatedEl = updatedControls[elName];

        updatedControls[elName] = updatedEl;

        let isFormValid = true;
        for(let elName in updatedControls) {
            isFormValid = updatedControls[elName].valid && isFormValid;
        }
        this.setState({controls: updatedControls, isFormValid: isFormValid});
    }

    checkIfValid(value, rules) {
        let isValid = true;
        if(rules?.required) isValid = value.trim() !== '' && isValid;
        if(rules?.minLength) isValid = value.length >= rules.minLength && isValid;
        if(rules?.maxLength) isValid = value.length <= rules.maxLength && isValid;

        return isValid
    }

    onChangeSignMode = () => this.setState(prevState => ({isSignUpMode: !prevState.isSignUpMode}));

    render() {
        const arrayOrderForm = [];
        for(let key in this.state.controls) {
            arrayOrderForm.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = arrayOrderForm.map(el => (
            <Input 
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                onChange={(e) => this.inputChangeHandler(e, el.id)}
            />
        ));

        if(this.props.isLoading) form = <Spinner />;

        const errorMessage = this.props.error ? this.props.error?.message : null;

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <CustomButton 
                        btnType='Success'
                        disabled={!this.state.isFormValid}>Submit</CustomButton>
                </form>

                <CustomButton 
                    clicked={this.onChangeSignMode}
                    btnType='Danger'>{this.state.isSignUpMode ? 'Sign In' : 'Sign Up'} instead</CustomButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpMode) => dispatch(actions.auth(email, password, isSignUpMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Auth);