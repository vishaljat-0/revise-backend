// Mock data — swap `data` in App.jsx with your real API response
export const MOCK_DATA = {
  problem:
    "Explain the difference between **deep learning** and **machine learning**. Provide a Python code example of a simple neural network using PyTorch, and compare it to a classical ML approach using scikit-learn for the same problem.",

  aiSolution_1: `## Machine Learning vs Deep Learning

**Machine Learning** is a subset of AI where algorithms learn patterns from data using hand-crafted features.

**Deep Learning** uses multi-layer neural networks that learn feature representations automatically.

### Classical ML Approach (scikit-learn)

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
print(f"Accuracy: {accuracy_score(y_test, clf.predict(X_test)):.4f}")
\`\`\`

### Key Differences

| Feature | Machine Learning | Deep Learning |
|---|---|---|
| Feature engineering | Manual | Automatic |
| Data requirements | Low–medium | High |
| Interpretability | High | Low |
| Training speed | Fast | Slow (GPU) |

Use ML for tabular data with limited samples. Use DL for images, audio, or NLP at scale.`,

  aiSolution_2: `## Deep Learning with PyTorch

Machine learning and deep learning differ primarily in **how they extract features** from data.

### Neural Network Implementation

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
scaler = StandardScaler()
X = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

X_train = torch.FloatTensor(X_train)
y_train = torch.LongTensor(y_train)
X_test  = torch.FloatTensor(X_test)
y_test  = torch.LongTensor(y_test)

class IrisNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(4, 16), nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(16, 3),
        )
    def forward(self, x):
        return self.net(x)

model     = IrisNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

for epoch in range(200):
    optimizer.zero_grad()
    loss = criterion(model(X_train), y_train)
    loss.backward()
    optimizer.step()

with torch.no_grad():
    preds = model(X_test).argmax(dim=1)
    acc = (preds == y_test).float().mean()
    print(f"Accuracy: {acc:.4f}")
\`\`\`

The neural network learns hierarchical representations automatically.
For Iris (small tabular data) both methods perform similarly — DL truly shines at scale with unstructured data.`,

  Judge: {
    Response_1_review: `**Competitor 01** delivers a well-structured, balanced comparison. The scikit-learn example is clean and production-ready. The comparison table is a strong pedagogical tool.

- ✅ Clear conceptual framing with good contrast between the two approaches
- ✅ Excellent markdown table for side-by-side comparison
- ⚠️ Missing the PyTorch neural network example explicitly requested`,

    Response_2_review: `**Competitor 02** fully addresses the problem prompt by providing a complete PyTorch neural network alongside a comparative explanation. The code includes data normalisation with \`StandardScaler\`, which is critical for neural network convergence.

- ✅ Complete PyTorch implementation with Dropout and Adam optimiser
- ✅ Addresses "same problem" using Iris dataset for both approaches
- ✅ Correct insight about DL vs ML for structured vs unstructured data
- ⚠️ A side-by-side comparison table would improve readability`,

    aiSOlution_1_score: 7.2,
    aiSolution_2_score: 8.8,
  },
};
