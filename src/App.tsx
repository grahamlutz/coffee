import React, { useState, useEffect, useRef, FunctionComponent as FC} from 'react';
import uniqid from 'uniqid';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useOrdersCounter } from './useOrdersCounter';

export interface IOrder {
  id: number;
  name: string;
  preparationTime: number
}

const menuItems = [
  {
    id: 1,
    name: 'Cafe Au Lait',
    preparationTime: 4
  },
  {
    id: 2,
    name: 'Cappuccino',
    preparationTime: 10
  },
  {
    id: 3,
    name: 'Espresso',
    preparationTime: 15
  }
]

const App: any = () => {
  const [ordersQueue, setOrdersQueue] = useState<any[]>([]);
  const [orderInProgress, setOrderInProgress] = useState<IOrder | null>(null);
  const [completedQueue, addToCompletedQueue] = useOrdersCounter()

  useEffect(() => {
    if(orderInProgress) return;
    if(ordersQueue.length <= 0) return;

    const newOIP = ordersQueue[0]

    setOrderInProgress(newOIP)
    setOrdersQueue(ordersQueue.slice(1))

    setTimeout(() => {
      addToCompletedQueue(newOIP)
      setOrderInProgress(null)
    }, newOIP.preparationTime * 1000)
  }, [ordersQueue, orderInProgress])

  return (
    <div className="App">
      <div className="App-header">
        {
          menuItems.map(({id, name, preparationTime}) => {
            return (
              <Button
                key={id}
                variant="primary"
                onClick={() => {
                  setOrdersQueue([...ordersQueue, {name, preparationTime, id: uniqid()}]);
                }}
              >
                {name}
              </Button>
            )
          })
        }
      </div>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h2>Orders</h2>
              <ol>
                {
                  ordersQueue?.map((order: IOrder) => {
                    return (
                      <li key={order.id}>
                        {order.name}
                      </li>
                    )
                  })
                }
                </ol>
            </Col>
            <Col>
              <h2>Order in Progess</h2>
              <span>{orderInProgress?.name}</span>
            </Col>
            <Col>
              <h2>Orders Completed</h2>
              <ol>
                {
                  completedQueue?.map((order: IOrder) => {
                    return (
                      <li key={order.id}>
                        {order.name}
                      </li>
                    )
                  })
                }
              </ol>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
