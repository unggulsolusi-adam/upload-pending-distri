(async () => {
    var qs = require('querystring')
    const mysql = require('mysql2')
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'api_1_distribusi'
    })

    while (true) {
        const a = () => new Promise((resolve, reject) => {
            conn.query(
                'SELECT COUNT(id) as jumlah_pending FROM pending WHERE completed = 0;',
                function (err, results, fields) {
                    process.stdout.write('\033c');
                    console.table(results[0]); // results contains rows returned by server

                    conn.query(
                        'SELECT `return`, ref, id FROM pending WHERE completed = 0 order by created_at ASC limit 1;',
                        function (err, results2, fields) {
                            console.log('Last response: ', (results2[0]?.return || '').slice(0, 500))

                            setTimeout(() => {
                                resolve();
                            }, 1000)
                        }
                    );
                }
            );
        })

        await a();
    }

})()
