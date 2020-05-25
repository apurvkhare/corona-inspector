import React from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';

import {fetchData} from './api'
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import coronaImage from './images/covid19_image.png';

class App extends React.Component{

    state={
        data: {},
        country:'',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({data: fetchedData, country: country});
    }

    render(){

        const {data, country} = this.state;
        
        const darkTheme = createMuiTheme({
            palette: {
              type: 'dark',
            },
          });

        return(
            <ThemeProvider theme={darkTheme}>
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <footer>
                    <h4>Designed & Developed By <a href='https://github.com/apurvkhare'>Apurv Khare</a></h4>
                </footer>
            </div>
            </ThemeProvider>
        )
    }
}

export default App;