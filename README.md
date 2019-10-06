# product-recommendation

This is an experimental project based on my EDA hosted on Kaggle [Product Recommendation EDA](https://www.kaggle.com/sebjwallace/ecommerce-product-recommendation-eda)

The project is split into three services:
- **Transactions** service collects entries from the client including `customerId`, `productId` and `quantity`. The client uses a HTTP POST endpoint to create one or many transactions. Each transaction is stored in a Postgress database then sent to the message broker (RabbitMQ).
- **Generator** services does the hard work by processing the transactions of a customer into a list of recommended products. As this process could take some time, it works asyncronously by consuming the message broker's *transactions* queue. Transactions could stack up in the queue and processed when the generator get around to them. Once processed the generator will send the recommendation to the broker's *recommendations* queue.
- **Recommendations** service picks up from the *recommendations* queue and stores the recommendations into a mongodb database. The purpose of using mongodb instead of postgress is because the recommendation is a somewhat instructured array of object that would not fit into a tabular model. Mongodb just stores the recommendations against a customerId. The recommendations API simply takes a customerID from the url parameter and returns the recommendations for that customer.
