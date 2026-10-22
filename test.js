const assert = require('assert');
const { formatWord } = require('./app.js');
console.log('🧪 Testing SprintRead...');
const out = formatWord('Sprint');
assert(out.includes('<span class="orp">'), 'Optimal Recognition Point (ORP) highlight formatted');
console.log('✅ SprintRead test passed!');