import React, { Component } from 'react';
import { BlockPicker } from 'react-color';

export default class ColorPicker extends React.Component {
    state = {
        pickColor: this.props.color,
    };
    
    handleChangeComplete = (color) => {
    this.setState({ 'pickColor': color.hex });
    this.props.handleColorChange(color.hex)
    };

    render() {
    return (
        <BlockPicker
        color={ this.state.pickColor }
        onChangeComplete={ this.handleChangeComplete }
        />
    );
    }
}