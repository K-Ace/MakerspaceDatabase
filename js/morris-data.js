$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010 Q1',
            all: 10,
            mentors: 5,
            users: 5
        }, {
            period: '2010 Q2',
            all: 20,
            mentors: 5,
            users: 15
        }, {
            period: '2010 Q3',
            all: 27,
            mentors: 5,
            users: 22
        }, {
            period: '2010 Q4',
            all: 31,
            mentors: 5,
            users: 26
        }, {
            period: '2011 Q1',
            all: 33,
            mentors: 5,
            users: 28
        }, {
            period: '2011 Q2',
            all: 35,
            mentors: 5,
            users: 30
        }, {
            period: '2011 Q3',
            all: 36,
            mentors: 5,
            users: 31
        }, {
            period: '2011 Q4',
            all: 38,
            mentors: 5,
            users: 33
        }, {
            period: '2012 Q1',
            all: 40,
            mentors: 5,
            users: 35
        }, {
            period: '2012 Q2',
            all: 44,
            mentors: 5,
            users: 39
        }],
        xkey: 'period',
        ykeys: ['all', 'mentors', 'users'],
        labels: ['All', 'Mentors', 'Users'],
        pointSize: 4,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Users",
            value: 38
        }, {
            label: "Volunteers",
            value: 12
        }, {
            label: "Administrators",
            value: 5
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
