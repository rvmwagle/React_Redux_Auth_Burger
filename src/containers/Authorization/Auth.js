import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        authForm:{
            userName:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your user name'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, el) => {
        // console.log('el:' , el);
        const updatedAuthForm = {
            ...this.state.authForm
        } 
        // console.log(updatedAuthForm); // state starting from userName: ....
        
        const updatedElement = {
            ...updatedAuthForm[el]
        }

        // console.log(updatedElement); // array inside of userName starting frm : elementType ....

        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);

        updatedAuthForm[el] = updatedElement;

        let formIsValid = true;
        for (let el in updatedAuthForm) {
            formIsValid = updatedAuthForm[el].valid && formIsValid;
        }

        this.setState({
            authForm : updatedAuthForm,
            formIsValid: formIsValid
        });

    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onFormSubmit(this.state.authForm.userName.value,this.state.authForm.password.value,this.props.isSignUp);   
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated){
            if (!this.props.purchasing) {
                this.props.history.push('/');
            }
            else {
                this.props.history.replace('/checkout');
            }
        }
    }

    render(){

        let formElements = [];

        for (let ctr in this.state.authForm) {
            formElements.push({
                id: ctr,
                config: this.state.authForm[ctr]
            });
        }
        // console.log('Formelements : ' , formElements);
        let errorElement = (this.props.error !== null ? <p>Error : {this.props.error}</p> : null);
        let btnSignInUpElementText = (this.props.isSignUp ? 'Switch To Sign in' : 'Switch to Sign Up');
        let form = (
            <form onSubmit={this.formSubmitHandler}> 
                {formElements.map(element => {
                    return(
                        <Input 
                        key = {element.id}
                        value = {element.config.value}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed = {(event) => this.inputChangedHandler(event, element.id)}/>
                    );
                })}
                <Button btnType='Success'>Submit</Button> 
            </form>
        );
        if (this.props.loading)
        {
            form = <Spinner />
        }
        return(
            <div className={classes.Auth}>
                {errorElement}
                {form}
                <Button btnType='Danger' clicked={this.props.onSwitchSignInUp} >{btnSignInUpElementText}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated,
        error : state.auth.error,
        isSignUp : state.auth.isSignUp,
        loading: state.auth.loading,
        purchasing : state.burgerBuilderReducer.purchasing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit : (email,password, isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSwitchSignInUp : () => dispatch(actions.authSetState())
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth);