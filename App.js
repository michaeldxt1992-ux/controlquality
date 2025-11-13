import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', category: '', description: '' });

  useEffect(() => {
    setCompanies([
      { id: 1, name: 'TechFlow Solutions', category: 'Technology', rating: 4.9, reviews: 1247, description: 'Leading software development and cloud solutions provider', qualityScore: 98 },
      { id: 2, name: 'HealthCare Plus', category: 'Healthcare', rating: 4.8, reviews: 892, description: 'Comprehensive healthcare services with patient-first approach', qualityScore: 96 },
      { id: 3, name: 'SecureBank Corp', category: 'Finance', rating: 4.7, reviews: 2156, description: 'Trusted financial services with innovative banking solutions', qualityScore: 94 }
    ]);
  }, []);

  const filtered = companies
    .filter(c => (c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())))
    .filter(c => !category || c.category === category)
    .sort((a,b) => b.qualityScore - a.qualityScore);

  const rateCompany = (id) => {
    setCompanies(prev => prev.map(c => c.id === id
      ? { ...c, rating: Math.min(5.0, Math.round((c.rating + Math.random()*0.2)*10)/10), reviews: c.reviews + 1, qualityScore: Math.min(100, c.qualityScore + Math.floor(Math.random()*3)) }
      : c
    ));
  };

  const addCompany = () => {
    const company = {
      id: companies.length + 1,
      name: newCompany.name || 'Nova Empresa',
      category: newCompany.category || 'Outros',
      description: newCompany.description || `Professional ${newCompany.category ? newCompany.category.toLowerCase() : 'services'} provider`,
      rating: 4.0 + Math.random(),
      reviews: Math.floor(Math.random()*500) + 50,
      qualityScore: Math.floor(Math.random()*20) + 80
    };
    setCompanies(prev => [...prev, company]);
    setShowModal(false);
    setNewCompany({ name: '', category: '', description: '' });
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f3f4f6'}}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Control Quality</Text>
        <Text style={styles.subtitle}>Control Quality — Melhore a qualidade dos serviços em São Paulo</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.controls}>
          <TextInput value={search} onChangeText={setSearch} placeholder="Pesquisar empresas..." style={styles.input} />
          <TextInput value={category} onChangeText={setCategory} placeholder="Filtrar por categoria (ex: Technology)" style={styles.input} />
          <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}><Text style={{color:'#fff'}}>+ Adicionar</Text></TouchableOpacity>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{paddingBottom:40}}
          renderItem={({item, index}) => {
            const isTop = index < 3;
            return (
              <View style={[styles.card, isTop ? styles.topCard : null]}>
                <View style={{flex:1}}>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={styles.companyName}>{item.name}</Text>
                    {isTop && <Text style={{fontSize:20}}>🏆</Text>}
                  </View>
                  <Text style={styles.meta}>{item.category} • {item.rating} ({item.reviews} reviews)</Text>
                  <Text style={styles.desc}>{item.description}</Text>
                  <View style={styles.cardFooter}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={{marginRight:8}}>Quality:</Text>
                      <View style={styles.progressBg}><View style={[styles.progressFill, {width: `${item.qualityScore}%`}]} /></View>
                      <Text style={{marginLeft:8, fontWeight:'700'}}>{item.qualityScore}%</Text>
                    </View>
                    <TouchableOpacity style={styles.rateBtn} onPress={() => rateCompany(item.id)}><Text style={{color:'#fff'}}>Avaliar</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Adicionar Empresa</Text>
            <TextInput placeholder="Nome" value={newCompany.name} onChangeText={t => setNewCompany({...newCompany, name: t})} style={styles.input} />
            <TextInput placeholder="Categoria" value={newCompany.category} onChangeText={t => setNewCompany({...newCompany, category: t})} style={styles.input} />
            <TextInput placeholder="Descrição" value={newCompany.description} onChangeText={t => setNewCompany({...newCompany, description: t})} style={[styles.input, {height:80}]} multiline />
            <View style={{flexDirection:'row', gap:8, marginTop:8}}>
              <TouchableOpacity style={[styles.addButton, {flex:1}]} onPress={addCompany}><Text style={{color:'#fff'}}>Adicionar</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.cancelBtn, {flex:1}]} onPress={() => setShowModal(false)}><Text>Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = {
  header: { backgroundColor:'#6d28d9', padding:16, paddingTop:36 },
  title: { color:'#fff', fontSize:28, fontWeight:'700', textAlign:'center' },
  subtitle: { color:'#e9d5ff', textAlign:'center', marginTop:6 },
  container: { padding:16, flex:1 },
  controls: { flexDirection:'row', gap:8, marginBottom:12, alignItems:'center' },
  input: { backgroundColor:'#fff', padding:10, borderRadius:8, flex:1, marginRight:8, borderWidth:1, borderColor:'#e5e7eb' },
  addButton: { backgroundColor:'#2563eb', padding:10, borderRadius:8 },
  card: { backgroundColor:'#fff', padding:12, borderRadius:10, marginBottom:12, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:6 },
  topCard: { borderWidth:2, borderColor:'#f59e0b' },
  companyName: { fontSize:18, fontWeight:'700' },
  meta: { color:'#6b7280', marginTop:4 },
  desc: { color:'#374151', marginTop:8 },
  cardFooter: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:12 },
  progressBg: { backgroundColor:'#e5e7eb', height:10, width:120, borderRadius:20, overflow:'hidden' },
  progressFill: { backgroundColor:'#16a34a', height:10 },
  rateBtn: { backgroundColor:'#2563eb', padding:8, borderRadius:8 },
  modalOverlay: { flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', padding:16 },
  modal: { backgroundColor:'#fff', borderRadius:10, padding:16 },
  modalTitle: { fontSize:18, fontWeight:'700', marginBottom:8 }
};
