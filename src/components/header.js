import React,{Component} from 'react'
import styled from 'styled-components'


export default class Header extends Component {
    render(){
        return (
            <HeaderContainer>
                Travelsmmsss
            </HeaderContainer>
        );
    }
}

const HeaderContainer = styled.div`
    overflow: hidden;
    background-color: #f1f1f1;
    padding: 20px 10px;
`