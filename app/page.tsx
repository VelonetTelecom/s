
"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

const prizes = [
  { label: "💸 R$10 no Pix", chance: 3.33 },
  { label: "🔥 20% de desconto", chance: 3.33 },
  { label: "📺 1 mês de TV Premium", chance: 3.34 },
  { label: "😅 Não foi dessa vez...", chance: 90 },
];

function getRandomPrize() {
  const total = prizes.reduce((acc, p) => acc + p.chance, 0);
  const rand = Math.random() * total;
  let sum = 0;
  for (const prize of prizes) {
    sum += prize.chance;
    if (rand <= sum) return prize.label;
  }
  return prizes[prizes.length - 1].label;
}

export default function RoletaPontualidade() {
  const [prize, setPrize] = useState("");
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setPrize("");
    setTimeout(() => {
      const result = getRandomPrize();
      setPrize(result);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4">
      <h1 className="text-3xl font-bold text-black mb-2">🎰 Roleta da Pontualidade</h1>
      <p className="text-center text-black max-w-md mb-6">
        Esse game é um benefício exclusivo da <strong>Velonet</strong> para os clientes que pagam seus boletos em dia.
        Gire a roleta e concorra a prêmios incríveis como Pix, descontos e muito mais!
      </p>
      <motion.div
        animate={{ rotate: spinning ? 1080 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-64 h-64 rounded-full border-8 border-yellow-500 flex items-center justify-center bg-white shadow-xl"
      >
        <Wifi className="w-16 h-16 text-yellow-500" />
      </motion.div>
      <Button
        className="mt-6 bg-black text-white hover:bg-yellow-600"
        onClick={handleSpin}
        disabled={spinning}
      >
        {spinning ? "Girando..." : "Girar a Roleta"}
      </Button>
      {prize && (
        <Card className="mt-6 bg-white text-center">
          <CardContent>
            <p className="text-xl font-semibold">🏆 {prize}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
