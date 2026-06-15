# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 223 ms
- **Render duration**: 223 ms
- **Screenshot**: ![Sort countries profiler results](performance-starter/screenshots/baseline/image-2.png)

### Interaction B: Search countries

- **Commit duration**: 213 ms
- **Render duration**: 213 ms
- **Screenshot**: ![Search countries profiler results](performance-starter/screenshots/baseline/image-3.png)

### Interaction C: Change year

- **Commit duration**: 242 ms
- **Render duration**: 242 ms
- **Screenshot**: ![Change year profiler results](performance-starter/screenshots/baseline/image-4.png)

### Interaction D: Toggle column

- **Commit duration**: 695 ms
- **Render duration**: 695 ms
- **Screenshot**: ![Toggle column profiler results](performance-starter/screenshots/baseline/image-5.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 102 ms
- **Render duration**: 101 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image.png)

### Interaction B: Search countries

- **Commit duration**: 123 ms
- **Render duration**: 117 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-1.png)

### Interaction C: Change year

- **Commit duration**: 171.4 ms
- **Render duration**: 169.1 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-6.png)

### Interaction D: Toggle column

- **Commit duration**: 58.4 ms
- **Render duration**: 56.4 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-7.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 223        | 102         | -54%     |
| Search countries | 213        | 123         | -42%     |
| Change year      | 242        | 171         | -29%     |
| Toggle column    | 695        | 58          | -91%     |
| **Average**      | **343**    | **113**     | **-67%** |