class Layer0Hub {

    openSearchLabel?: HTMLHeadElement
    logsButton?: HTMLElement
    loginButton?: HTMLElement

    createOpenSearchButtons() {
        try {
            // Create label
            this.openSearchLabel = document.createElement('h5') as HTMLHeadingElement;
            this.openSearchLabel.setAttribute('id', 'open-search-lable');
            this.openSearchLabel.setAttribute('class', 'MuiTypography-root general-info MuiTypography-h5');
            this.openSearchLabel.setAttribute('style', 'text-align: right; align-self: center; margin: 0 5px');
            this.openSearchLabel.innerHTML = 'OpenSearch: ';
            
            // Create login button
            this.loginButton = document.createElement('button') as HTMLButtonElement;
            this.loginButton.setAttribute('id', 'open-search-login-btn');
            this.loginButton.setAttribute('class', 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary');
            this.loginButton.setAttribute('style', 'margin: 0 5px');
            this.loginButton.innerHTML = 'Login';
            this.loginButton.addEventListener('click', this.openSearchLogin);

            // Create logs button
            this.logsButton = document.createElement('button') as HTMLButtonElement;
            this.logsButton.setAttribute('id', 'open-search-logs-btn');
            this.logsButton.setAttribute('class', 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary');
            this.logsButton.setAttribute('style', 'margin: 0 5px');
            this.logsButton.innerHTML = 'View Logs';
            this.logsButton.addEventListener('click', this.openSearchLogs);
            
            // Get header menu
            const generalInformationNode = document.querySelectorAll('div.MuiPaper-root.MuiCard-root.MuiPaper-outlined.MuiPaper-rounded > div.container')[0];
            
            // Insert elements
            generalInformationNode.appendChild(this.openSearchLabel);
            generalInformationNode.appendChild(this.loginButton);
            generalInformationNode.appendChild(this.logsButton);

        } catch (error) {
            console.error(error);
        }   
    }

    deleteOpenSearchButton = () => {
        try {
            if (this.openSearchLabel) {
                this.openSearchLabel.remove();
            } 
            if (this.logsButton) {
                this.logsButton.remove();
            } 
            if (this.loginButton) {
                this.loginButton.remove();
            } 
        } catch (error) {
            console.error(error);
        }
    
    }

    private getAwsRegion = () => {
        try {
            const cloudDeploymentSection = document.querySelectorAll('ul')[4];
            const primaryRegionLabel = cloudDeploymentSection.querySelectorAll('li')[2];
            const primaryRegion = primaryRegionLabel.querySelectorAll('span')[1].innerText;
            const awsRegion = primaryRegion.split(' ')[0];
            return awsRegion;
        } catch (error) {
            console.error(error);
        }
    }

    private getSpace = () => {
        try {
            const selectElement = document.querySelectorAll('select')[0];
            const space = selectElement.querySelectorAll('option[aria-selected="true"]')[0].innerHTML;
            return space;
        } catch (error) {
            console.error(error);
        }
    }

    private openSearchLogin = () => {
        const region = this.getAwsRegion();
        if (region) {
            window.open(`https://logs.admin.pop-aws-${region}.pop.prod.a0core.net`, '_blank', 'noopener');
        } else {
            console.error("Error: No Region");
        }
    }

    private openSearchLogs = () => {
        const region = this.getAwsRegion();
        const space = this.getSpace();
        if (region && space) {
            window.open(`https://logs.admin.pop-aws-${region}.pop.prod.a0core.net/_dashboards/app/discover#/?_a=(columns:!(log_type,operation,res.status_code,req.ip,space,tenant),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:logs_server,key:space,negate:!f,params:(query:${space}),type:phrase),query:(match_phrase:(space:${space})))),index:logs_server,interval:auto,query:(language:kuery,query:''),sort:!())&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))`, '_blank', 'noopener');
        } else {
            console.error("Error: No Region or Space");
        }
    }
}

const layer0Hub = new Layer0Hub;

browser.runtime.onMessage.addListener((req, _sender, res) => {
    if (req && req.layer0HubDetailsPage) {
        setTimeout(() => {
            layer0Hub.deleteOpenSearchButton();
            layer0Hub.createOpenSearchButtons();
            res("200 Success");
        }, 2000);
    } else {
        layer0Hub.deleteOpenSearchButton();
    }
})