import React from 'react';
import './DashboardTable.css';
import {Space, Switch, Table, Tag, Checkbox} from 'antd';

function DashboardTable({displayHandler, trendLineHandler}) {
    const columns = [
        {
            title: 'Показатели (у)',
            dataIndex: 'stat',
            key: '1',
            className : 'test',
            render : (text, {section, color}, index) => {
                return <div className="cell_wrapper">
                    <div className="label_wrapper">
                        <Checkbox onChange={() => displayHandler(index)}/>
                        <div className={text}>{section}</div>
                    </div>
                    <div className="color" style={{backgroundColor: color, borderColor : color}}/>
                </div>
            }
        },
        {
            title: 'Показать линию тренда',
            dataIndex: 'trend',
            key: '2',
            render : (text, record, index) => <Switch onChange={() => trendLineHandler(index)}/>
        },
        {
            title: 'Показать числовые значения',
            dataIndex: 'values',
            key: '3',
            render : () => <Switch/>
        },
        {
            title: 'Показать год назад',
            key: '4',
            dataIndex: 'lastYear',
            render : () => <Switch/>
        }
    ];

    const data = [
        {
            section : 'Зарегистрировалось  пользователей',
            color : '#59AD59',
            key : 'registrations'
        },
        {
            section : 'Визиты',
            color : "#731bcd",
            key : 'visits'
        }
    ];
    return (
        <Table className="dashboard_table" columns={columns} dataSource={data} pagination={false}/>
    )
}

export { DashboardTable };