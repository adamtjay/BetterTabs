/*global chrome*/
import React, { Component } from 'react';
import { render } from '@testing-library/react';

export default class MainWindow extends Component {
    constructor(props){
        super(props);
    }

    state = {
        tabsList: ''
    }

    getCurrentTabs(){
        const tabsManaged = [];
        chrome.tabs.query({}, function(tabs) { 
            tabs.forEach((tab) => {
                let tabObject = {
                    name: tab.title,
                    active: tab.active,
                    pinned: tab.pinned,
                    windowId: tab.windowId,
                    icon: tab.favIconUrl,
                    url: tab.url,
                    timestamp: new Date().getTime()
                }
                tabsManaged.push(tabObject);
            })
            localStorage.setItem("tabsManaged", JSON.stringify(tabsManaged));
            let tabsList = localStorage.getItem('tabsManaged');
            console.log('localStorage: ', typeof(tabsList), tabsList);    
            return tabsList;
            } );
    }

    componentDidMount() {
        console.log('component mounted');
        this.getCurrentTabs()
    }

    render() {
        const style = {
            width: '400px',
            height: '800px',
            padding: '10px',
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }

        return (
            <div style={style}>
                
                <h1 style={{ fontSize: '30px' }}>TabViewer</h1>
                <p>Testing</p>
        
            </div>
        )
    }

}