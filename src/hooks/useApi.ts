import { useState, useEffect } from 'react';
import tslaHistory from '../../data/TSLA_history_2015-2025.json';
// Mock data
const mockAssets = ['TSLA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'AMD'];
const mockFundamentalData = {
  market_cap: '580.2 tỷ USD',
  pe_ratio: '42.3',
  eps: '4.30 USD',
  dividend_yield: '0%',
  beta: '2.15',
  avg_volume: '108.5 triệu',
  high_52w: '299.29 USD',
  low_52w: '138.80 USD'
};
const mockNews = [{
  title: 'Tesla công bố kết quả kinh doanh quý 4: Lợi nhuận giảm 40%',
  url: '#',
  date: '24/01/2024'
}, {
  title: 'Tesla mở rộng nhà máy tại Texas với vốn đầu tư 10 tỷ USD',
  url: '#',
  date: '22/01/2024'
}, {
  title: 'Cổ phiếu Tesla được các quỹ đầu tư lớn tăng tỷ trọng nắm giữ',
  url: '#',
  date: '20/01/2024'
}, {
  title: 'Tesla ra mắt mẫu xe mới Model Y với công nghệ tự lái cải tiến',
  url: '#',
  date: '18/01/2024'
}, {
  title: 'Tesla tăng cường đầu tư vào AI và tự động hóa với ngân sách 5 tỷ USD',
  url: '#',
  date: '15/01/2024'
}];
// Chuyển đổi dữ liệu JSON sang dạng mảng số cho biểu đồ
const parsedChartData = {
  prices: (tslaHistory as any[]).map(row => [
    new Date(row.Date).getTime(),
    parseFloat(row.Open),
    parseFloat(row.High),
    parseFloat(row.Low),
    parseFloat(row.Close)
  ]),
  xai_data: Array.from({ length: (tslaHistory as any[]).length }, () => Math.random())
};
// Mock API hooks
export const useAssets = () => {
  const [assets, setAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setAssets(mockAssets);
      setLoading(false);
    }, 500);
  }, []);
  return {
    assets,
    loading,
    error
  };
};
export const useChartData = (ticker: string) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setChartData(parsedChartData);
      setLoading(false);
    }, 800);
  }, [ticker]);
  return {
    chartData,
    loading,
    error
  };
};
export const useFundamentalData = (ticker: string) => {
  const [fundamentalData, setFundamentalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFundamentalData(mockFundamentalData);
      setLoading(false);
    }, 600);
  }, [ticker]);
  return {
    fundamentalData,
    loading,
    error
  };
};
export const useNews = (ticker: string) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 700);
  }, [ticker]);
  return {
    news,
    loading,
    error
  };
};
export const usePrediction = () => {
  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const predict = async (ticker: string, horizon: string) => {
    setPredicting(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Generate mock prediction data
      const lastPrice = parsedChartData.prices[parsedChartData.prices.length - 1][4] as number;
      const predictionPoints = 20;
      const mockPrediction = Array.from({
        length: predictionPoints
      }, (_, i) => {
        const date = new Date();
        const lastDate = new Date(parsedChartData.prices[parsedChartData.prices.length - 1][0] as number);
        if (horizon === '5 phút') {
          date.setTime(lastDate.getTime() + (i + 1) * 5 * 60 * 1000);
        } else if (horizon === '1 giờ') {
          date.setTime(lastDate.getTime() + (i + 1) * 3 * 60 * 1000);
        } else {
          date.setTime(lastDate.getTime() + (i + 1) * 60 * 60 * 1000);
        }
        // Generate a price with a slight trend and randomness
        const trend = Math.random() > 0.5 ? 1 : -1;
        const newPrice = lastPrice * (1 + trend * 0.001 * (i + 1) + (Math.random() - 0.5) * 0.01);
        return [date.getTime(), newPrice];
      });
      setPrediction(mockPrediction);
    } catch (err) {
      setError('Lỗi khi thực hiện dự đoán');
    } finally {
      setPredicting(false);
    }
  };
  return {
    predict,
    predicting,
    prediction,
    error
  };
};
export const useChatbot = () => {
  const [chatHistory, setChatHistory] = useState<{
    role: 'user' | 'bot';
    message: string;
  }[]>([]);
  const [sending, setSending] = useState(false);
  const sendMessage = async (botName: string, message: string) => {
    if (!message.trim()) return;
    // Add user message to history
    setChatHistory(prev => [...prev, {
      role: 'user',
      message
    }]);
    setSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock response based on bot name
      let response;
      if (botName === 'gemini') {
        response = `[Gemini] Phân tích của tôi về "${message}": Thị trường đang có dấu hiệu tích cực với các cổ phiếu công nghệ, trong khi Tesla đang gặp áp lực từ các đối thủ cạnh tranh.`;
      } else {
        response = `[Chatbot 2] Dựa trên câu hỏi "${message}", tôi thấy Tesla đang có xu hướng tăng trong ngắn hạn, nhưng cần chú ý vùng kháng cự $200.`;
      }
      setChatHistory(prev => [...prev, {
        role: 'bot',
        message: response
      }]);
    } finally {
      setSending(false);
    }
  };
  return {
    chatHistory,
    sending,
    sendMessage
  };
};