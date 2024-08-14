<h1>Transaction and Balance Update Feature</h1>

<h2>Description</h2>

<p>This project is a NestJS application that manages user transactions, including debit and credit operations, and updates user wallet balances using MongoDB. It supports basic validation, error handling, and ensures that debit transactions do not cause the balance to go negative.</p>

<h2>Project Setup</h2>

<h3>Installation</h3>

<ol>
  <li>Clone the repository:</li>
  <pre><code>git clone https://github.com/Orumgbe/transaction-balance.git<br>
cd transaction-balance
  </code></pre>
  
  <li>Install the dependencies:</li>
  <pre><code>npm install</code></pre>
</ol>

<h3>Running the App</h3>

<ul>
  <li><strong>Development mode:</strong></li>
  <pre><code>npm run start</code></pre>

  <li><strong>Watch mode:</strong></li>
  <pre><code>npm run start:dev</code></pre>

  <li><strong>Production mode:</strong></li>
  <pre><code>npm run start:prod</code></pre>
</ul>

<h2>Models</h2>

<h3>User Model</h3>
<ul>
  <li><code>id</code>: Auto-generated string (transformed from <code>_id</code>)</li>
  <li><code>username</code>: String (required)</li>
  <li><code>email</code>: String (required, unique)</li>
  <li><code>password</code>: String (hashed, required)</li>
  <li><code>walletBalance</code>: Number (default: 0)</li>
  <li><code>createdAt</code>: Date (auto-generated)</li>
  <li><code>updatedAt</code>: Date (auto-generated)</li>
</ul>

<h3>Transaction Model</h3>
<ul>
  <li><code>id</code>: Auto-generated string (transformed from <code>_id</code>)</li>
  <li><code>amount</code>: Number (required)</li>
  <li><code>type</code>: String (required, either 'debit' or 'credit')</li>
  <li><code>status</code>: String (required, e.g., 'pending', 'completed', 'failed')</li>
  <li><code>userId</code>: ObjectId (reference to User, required)</li>
  <li><code>createdAt</code>: Date (auto-generated)</li>
  <li><code>updatedAt</code>: Date (auto-generated)</li>
</ul>

<h2>Controllers and Services</h2>

<h3>Endpoints</h3>
<ul>
  <li><strong>POST /transactions</strong>: Create a new transaction (debit or credit) for a user.</li>
</ul>

<h3>Transaction Logic</h3>
<ul>
  <li><strong>Debit</strong>: Deducts the specified amount from the user’s wallet balance.</li>
  <li><strong>Credit</strong>: Adds the specified amount to the user’s wallet balance.</li>
  <li><strong>Validation</strong>: Ensures that the balance cannot go negative for debit transactions.</li>
  <li><strong>Status Update</strong>: Updates the transaction status to 'completed' or 'failed' based on the outcome.</li>
</ul>

<h2>Validation and Error Handling</h2>

<ul>
  <li>Ensures sufficient balance for debit transactions.</li>
  <li>Handles various error scenarios with appropriate HTTP status codes and messages.</li>
</ul>

<h2>Testing</h2>

<p><strong>Note</strong>: The testing segment has not yet been implemented. The README will be updated after the testing has been completed.</p>

<h3>Example API Requests</h3>

<ul>
  <li><strong>Create Transaction (Credit):</strong></li>
  <pre><code>POST /transactions<br>
{<br>
  "amount": 100,<br>
  "type": "credit",<br>
  "userId": "60b8a3c2e1b5c2a0d4f1c2d2"<br>
}</code></pre>

  <li><strong>Create Transaction (Debit):</strong></li>
  <pre><code>POST /transactions<br>
{<br>
  "amount": 50,<br>
  "type": "debit",<br>
  "userId": "60b8a3c2e1b5c2a0d4f1c2d2"<br>
}</code></pre>
</ul>
