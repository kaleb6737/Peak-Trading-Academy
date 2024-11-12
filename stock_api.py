import requests
import yaml

class StockAPI:
    def __init__(self, api_key=None, base_url="https://yahoo-finance166.p.rapidapi.com/api/"):
        """
        If you have your own API KEY for yahoo finance place it in the yaml file and it will pick that one.
        """
        if api_key == None:
            with open("stock_stuff.yaml","r") as yaml_file:
                file = yaml.safe_load(yaml_file)
                self.api_key = file["api_key"]  
                
        self.base_url = base_url
        self.headers ={
	    "x-rapidapi-key": self.api_key,
	    "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com"
        }

    # def get_price(self, ticker = "AAPL"):
    #     """
    #     1.Takes ticker symbol and places in querystring to search for data with ticker symbol
    #     2.Full url path for only stock prices
    #     3.looks through long ass dictionary to get ticker price
    #     return: string of stock price
    #     """
    #     querystring = {"region":"US","symbol":{ticker.upper()}}
    #     full_url = self.base_url+"stock/get-price"
    #     apple_data_obj = requests.get(full_url,headers=self.headers,params=querystring)
    #     apple_data_json = apple_data_obj.json()
    #     breakpoint()
    #     return apple_data_json.get("quoteSummary","213").get("result","213")[0].get("price")["regularMarketPrice"].get("raw")
    
    def get_chart_price_data(self, ticker = "AAPL"):
        """
        Runs stock 
        1.Takes ticker symbol and places in querystring to search for data with ticker symbol
        2.Full url path for get_chart endpoint in api 
        3.looks through long ass dictionary to get ticker price,stock prices, stock timeframes
        return:(STOCK_TIMEFRAME,STOCK_PRICES,CURRENT_STOCK_PRICE)
        """
        querystring = {"region":"US","symbol":{ticker.upper()},"interval":"5m"}
        full_url = self.base_url+"stock/get-chart"

        data_obj = requests.get(full_url,headers=self.headers,params=querystring)
        data_json= data_obj.json()

        currect_price = data_json.get("chart","failure").get("result","213")[0].get("meta")["regularMarketPrice"]
        stock_prices = data_json["chart"]["result"][0]["indicators"]["quote"][0]["close"]
        stock_timeframes = data_json["chart"]["result"][0]["timestamp"]

        return currect_price,stock_timeframes,stock_prices
    
if __name__ == "__main__":
    current_price,sock_timeframe_list,stock_prices_list = StockAPI().get_chart_price_data()
    print(current_price,(stock_prices_list),(sock_timeframe_list))
    