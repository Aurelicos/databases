export class sql {
    static query = `await connection.execute('SELECT * FROM showcase');        `;

    static query1 = `const name = \`User_\${Math.floor(Math.random() * 1000)}\`;   
const email = \`\${name}@example.com\`;                       
query = 'INSERT INTO showcase (name, email) VALUES (?, ?)';
await connection.execute(query, [name, email]);            `;

    static query2 = `query = 'DELETE FROM showcase ORDER BY id DESC LIMIT 1';   
await connection.execute(query);                           `;

    static js = `const Showcase = sequelize.define('Showcase', {            
    name: DataTypes.STRING,                                
    email: DataTypes.STRING                                
}, {                                                       
    tableName: 'showcase'                                  
});                                                        

const finalRows = await Showcase.findAll();                `;

    static js1 = `const name = \`User_\${Math.floor(Math.random() * 1000)}\`;   
const email = \`\${name}@example.com\`;                       
await Showcase.create({ name, email });                    

const count = await Showcase.count();                      `;

    static js2 = `const lastEntry = await Showcase.findOne({                 
    order: [['id', 'DESC']]                                
});                                                        
if (lastEntry) {                                           
    await lastEntry.destroy();                             
}                                                          `;
}

export class nosql {
    static code = `const finalRows = await collection.find().toArray();                      `;

    static code1 = `const name = \`User_\${Math.floor(Math.random() * 1000)}\`;                  
const email = \`\${name}@example.com\`;                                      
await collection.insertOne({ name, email });                              `;

    static code2 = `const lastDoc = await collection.find().sort({ _id: -1 }).limit(1).next();
if (lastDoc) {                                                            
    await collection.deleteOne({ _id: lastDoc._id });                     
}                                                                         `;

}