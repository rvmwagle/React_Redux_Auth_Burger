import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axiosInstance from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:''
            }
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.price);
        // alert('You continued!');
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:'Swapna Prakash',
                address:{
                    street:'Blueridge',
                    zipCode:'452009',
                    country:'India'
                },
                email:'swapna.test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        // .json is important for firebase to know where to store it
        //  to get an error simply remove it
        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                // this will only work when we have access to route params
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(inputIdentifier);
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        console.log(updatedOrderForm);
        //IMPORTANT CONCEPT Deepclone : array has objects. nested array has nested objects
        // even the nested objects are stored as refs hence we need to clone if we are to change its state
        //here we went two levels since we wanted to change the value prop

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        console.log(updatedFormElement);
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm:updatedOrderForm});
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        } 

        let form =(
            <form>
                {formElementsArray.map(formElement => {
                    return(
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                    );
                })}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form =<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        );
    }
}

export default ContactData;