import React from 'react'
import { Link } from "react-router-dom"

class AdminBlock extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
          <div className="admin-block">
            <img src="https://sun9-23.userapi.com/impg/_ETpQ669o1tzaKUYjlQIU8V9_L_o2dRGfeUKVw/mFHmYEL2u2A.jpg?size=1280x862&quality=95&sign=7d3d4f1eb3d6166007f7f211adceae09&type=album" class="cover" />
            <div className="access-block">
                <h2>Доступы</h2>
                <ul>
                    <li>
                        <label><a href="http://windmail.ru:8000/admin/" target="_blank">Админ-панель:</a></label>
                        <p>root:mao12345</p>
                    </li>
                    <li>
                        <label><a href="https://cp.beget.com/main" target="_blank">VPS панель:</a></label>
                        <p>sverka8n:coupavankey111P@</p>
                    </li>
                    <li>
                        <label>SSH:</label>
                        <p>root:coupavankey111P@</p>
                    </li>
                    <li>
                        <label><a href="https://ebsobersin.beget.app/index.php?route=/&route=%2Fdatabase%2Fstructure&db=cafepolls" target="_blank">База данных:</a></label>
                        <p>cafepolls:coupavankey111P@</p>
                    </li>
                    <li>
                        <label><a href="https://web17.beget.email/?_task=mail&_mbox=INBOX" target="_blank">Почтовый сервис:</a></label>
                        <p>sverka8n:coupavankey111PP</p>
                    </li>
                    <li>
                        <label>FTP:</label>
                        <p>tanya:mao123</p>
                    </li>
                </ul>
            </div>
          </div>
	  )
	}
}

export default AdminBlock
