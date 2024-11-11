import requests
import yaml

class StockAPI:
    def __init__(self, api_key, base_url=url:"https://yahoo-finance166.p.rapidapi.com
):
        self.api_key = api_key
        pass
    
if __name__ == "__main__":
    with open("stock_stuff.yaml","r") as file:
        config = yaml.load(file, Loader=yaml.FullLoader)
    api_key = config.get("api_key")
    print(api_key)