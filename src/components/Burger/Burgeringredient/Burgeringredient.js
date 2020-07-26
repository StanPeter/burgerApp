import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

class Burgeringredient extends Component {
    render() {
        let ingredient = null;

    switch(this.props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
    }
};

Burgeringredient.propTypes = {
    type: PropTypes.string.isRequired
};

// const mapStateToProps = state => {
//     return {
//         ingredient: state.ingredient
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default Burgeringredient;
//connect(mapStateToProps, mapDispatchToProps)